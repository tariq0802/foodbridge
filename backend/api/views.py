from django.db.models.functions import Coalesce
from django.db.models import Count
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.db.models import Sum
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import ValidationError
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    IsAdminUser,
    BasePermission,
)
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from .models import Address, Food, FoodCategory, Order, User
from .serializers import (
    CreateOrderSerializer,
    FoodAdminSerializer,
    FoodCategorySerializer,
    FoodSerializer,
    FoodCreateSerializer,
    OrderSerializer,
    UpdateOrderSerializer,
    UserSerializer,
    UserCreateSerializer,
    AddressSerializer,
)


# Create your views here.
class MyPaginationClass(PageNumberPagination):
    page_size = 8
    page_size_query_param = "page_size"
    max_page_size = 100


class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return User.objects.all()
        elif user.is_authenticated:
            return User.objects.filter(id=user.id)
        else:
            return User.objects.none()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return UserCreateSerializer
        return UserSerializer

    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
        # return User.objects.get(user=self.request.user)


class AddressListView(generics.ListCreateAPIView):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        user = request.user
        existing_addresses = Address.objects.filter(user=user)
        if existing_addresses.exists():
            return Response(
                {"detail": "Address already exists for the current user."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().create(request, *args, **kwargs)


class AddressDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            return Address.objects.get(user=self.request.user)
        except Address.DoesNotExist:
            raise NotFound("Address not found for the current user.")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class FoodCategoryListView(generics.ListCreateAPIView):
    queryset = FoodCategory.objects.all()
    serializer_class = FoodCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            serializer.save()


class FoodCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FoodCategory.objects.all()
    serializer_class = FoodCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            serializer.save()

    def perform_destroy(self, instance):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            instance.delete()


class FoodTableView(generics.ListAPIView):
    queryset = Food.objects.order_by("-posted_at")
    serializer_class = FoodSerializer


class FoodListView(generics.ListCreateAPIView):
    queryset = Food.objects.order_by("-posted_at")
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = MyPaginationClass

    def get_serializer_class(self):
        if self.request.method == "POST":
            return FoodCreateSerializer
        return FoodSerializer

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            user = self.request.user
            try:
                address = user.address
            except Address.DoesNotExist:
                raise ValidationError("User doesn't have an associated address.")
            serializer.save(posted_by=user)
        else:
            raise ValidationError("Authentication required to create food items.")

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.query_params.get("query", None)
        posted_by_id = self.request.query_params.get("user", None)

        if posted_by_id:
            posted_by = get_object_or_404(User, id=posted_by_id)
            queryset = queryset.filter(posted_by=posted_by)

        if query:
            queryset = queryset.filter(
                Q(food_name__icontains=query)
                | Q(description__icontains=query)
                | Q(category__category__icontains=query)
                | Q(posted_by__name__icontains=query)
                | Q(posted_by__address__location__icontains=query)
                | Q(posted_by__address__post_office__icontains=query)
                | Q(posted_by__address__police_station__icontains=query)
                | Q(posted_by__address__district__icontains=query)
                | Q(posted_by__address__state__icontains=query)
            )
        return queryset


class FoodDetailView(generics.RetrieveUpdateDestroyAPIView):
    http_method_names = ["get", "patch", "delete", "head", "options"]
    queryset = Food.objects.all()
    serializer_class = FoodSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user

        if user.is_authenticated:
            if instance.posted_by == user:
                serializer_class = FoodCreateSerializer
            elif user.is_staff:
                serializer_class = FoodAdminSerializer
            else:
                raise PermissionDenied(
                    "You do not have permission to perform this action."
                )

            self.serializer_class = serializer_class
            return super().update(request, *args, **kwargs)
        else:
            raise PermissionDenied("Authentication credentials were not provided.")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user

        if user.is_authenticated and (user.is_staff or instance.posted_by == user):
            return super().destroy(request, *args, **kwargs)
        else:
            raise PermissionDenied("You do not have permission to perform this action.")


class OrderListView(generics.ListCreateAPIView):
    http_method_names = ["get", "post", "head", "options"]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all()  # Admin can view all orders
        elif user.is_authenticated:
            return Order.objects.filter(user=user)
        else:
            return Order.objects.none()

    def get_permissions(self):
        if self.request.method == "POST" and not self.request.user.is_authenticated:
            raise PermissionDenied()
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = CreateOrderSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)


class IsOrderPending(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.status == "P"


class IsOrderOwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        return obj.user == request.user


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    http_method_names = ["get", "patch", "delete", "head", "options"]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.request.method == "PATCH":
            return [IsAdminUser()]
        elif self.request.method == "DELETE":
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_serializer_class(self):
        if self.request.method == "PATCH":
            return UpdateOrderSerializer
        return OrderSerializer


class SummaryView(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        users_with_quantity = User.objects.annotate(
            total_quantity=Coalesce(Sum("food__quantity"), 0)
        )
        top_users = users_with_quantity.order_by("-total_quantity")[:5]

        top_users_data = []
        for user in top_users:
            post_count = Food.objects.filter(posted_by=user).count()
            top_users_data.append(
                {
                    "user_id": user.id,
                    "username": user.name,
                    "total_quantity": user.total_quantity,
                    "post_count": post_count,
                }
            )
        user_count = User.objects.count()
        order_count = Order.objects.count()
        total_quantity = Food.objects.aggregate(total_quantity=Sum("quantity"))[
            "total_quantity"
        ]
        return Response(
            {
                "user_count": user_count,
                "order_count": order_count,
                "total_food_quantity": total_quantity,
                "top_users": top_users_data,
            },
            status=status.HTTP_200_OK,
        )
