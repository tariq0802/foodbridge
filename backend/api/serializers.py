from django.utils import timezone
from django.db import transaction
from django.db.models import F
from rest_framework import serializers
from .models import Food, FoodCategory, Order, OrderItem, User, Address


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            "id",
            "location",
            "post_office",
            "police_station",
            "district",
            "state",
            "pin",
            "phone",
        ]


class UserSerializer(serializers.ModelSerializer):
    address = AddressSerializer(required=False)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "name",
            "is_staff",
            "is_admin",
            "date_joined",
            "is_active",
            "address",
        ]


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "name",
            "password",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data["email"], name=validated_data["name"]
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class FoodCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodCategory
        fields = "__all__"


class FoodSerializer(serializers.ModelSerializer):
    category = FoodCategorySerializer()
    posted_by = UserSerializer()

    class Meta:
        model = Food
        fields = "__all__"


class FoodCreateSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=FoodCategory.objects.all())

    class Meta:
        model = Food
        fields = [
            "food_name",
            "category",
            "description",
            "quantity",
            "expired_at",
            "photo",
        ]

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("Quantity must be a positive integer.")
        return value

    def validate_expired_at(self, value):
        if value <= timezone.now():
            raise serializers.ValidationError("Expiration date must be in the future.")
        return value
    
class FoodAdminSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=FoodCategory.objects.all())

    class Meta:
        model = Food
        fields = [
            "food_name",
            "category",
            "description",
            "quantity",
            "expired_at",
            "photo",
            "is_published",
        ]

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("Quantity must be a positive integer.")
        return value

    def validate_expired_at(self, value):
        if value <= timezone.now():
            raise serializers.ValidationError("Expiration date must be in the future.")
        return value


class FoodMinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ["id", "food_name", "quantity", "photo", "posted_at"]


class OrderItemSerializer(serializers.ModelSerializer):
    food = FoodMinSerializer()

    class Meta:
        model = OrderItem
        fields = ["id", "quantity", "food"]


class OrderSerializer(serializers.ModelSerializer):
    item = OrderItemSerializer()
    user = UserSerializer()

    class Meta:
        model = Order
        fields = ["id", "user", "placed_at", "updated_at", "status", "item"]


class CreateOrderSerializer(serializers.Serializer):
    food_id = serializers.IntegerField()
    quantity = serializers.IntegerField()

    def validate_food_id(self, food_id):
        if not Food.objects.filter(pk=food_id).exists():
            raise serializers.ValidationError("Food item does not exist.")
        return food_id

    def validate_quantity(self, quantity):
        if quantity <= 0:
            raise serializers.ValidationError("Quantity should be a positive integer.")
        return quantity

    def create(self, validated_data):
        user = self.context["request"].user
        food_id = validated_data["food_id"]
        quantity = validated_data["quantity"]

        try:
            food = Food.objects.select_for_update().get(pk=food_id)
            if food.quantity >= quantity:
                order = Order.objects.create(user=user)
                OrderItem.objects.create(order=order, food=food, quantity=quantity)
                Food.objects.filter(pk=food_id).update(
                    quantity=F("quantity") - quantity
                )
                return order
            else:
                raise serializers.ValidationError("Insufficient quantity available")
        except Food.DoesNotExist:
            raise serializers.ValidationError("Food item does not exist")


class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["status"]

    def update(self, instance, validated_data):
        status = validated_data.get("status")
        if status == Order.STATUS_CANCELLED:
            with transaction.atomic():
                order_item = instance.item
                food = order_item.food
                quantity = order_item.quantity
                food.quantity += quantity
                food.save()
                instance.status = status
                instance.save()
        else:
            instance.status = status
            instance.save()
        return instance
