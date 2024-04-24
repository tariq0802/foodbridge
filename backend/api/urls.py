from django.urls import path
from . import views

urlpatterns = [
    path("users/", views.UserListView.as_view(), name="user-list"),
    path("summary/", views.SummaryView.as_view(), name="user-count"),
    path("users/me/", views.UserDetailView.as_view(), name="user-detail"),
    path("address/", views.AddressListView.as_view(), name="address-list"),
    path("address/me/", views.AddressDetailView.as_view(), name="address-detail"),
    path("categories/", views.FoodCategoryListView.as_view(), name="category-list"),
    path(
        "categories/<int:pk>/",
        views.FoodCategoryDetailView.as_view(),
        name="category-detail",
    ),
    path("foods/", views.FoodListView.as_view(), name="food-list"),
    path("foods/table/", views.FoodTableView.as_view(), name="food-table"),
    path("foods/<int:pk>/", views.FoodDetailView.as_view(), name="food-detail"),
    path("orders/", views.OrderListView.as_view(), name="order-list"),
    path("orders/<int:pk>/", views.OrderDetailView.as_view(), name="order-detail"),
]
