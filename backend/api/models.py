from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import MinValueValidator
from django.utils import timezone


# Create your models here.
class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is Required")
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff = True")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser = True")

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.name


class Address(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='address', null=True, blank=True)
    location = models.CharField(max_length=255)
    post_office = models.CharField(max_length=100)
    police_station = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pin = models.CharField(max_length=6)
    phone = models.CharField(max_length=10)


class FoodCategory(models.Model):
    category = models.CharField(max_length=255)


class Food(models.Model):
    food_name = models.CharField(max_length=100)
    category = models.ForeignKey(FoodCategory, on_delete=models.CASCADE)
    description = models.TextField()
    quantity = models.IntegerField(validators=[MinValueValidator(0)])
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE)
    posted_at = models.DateTimeField(auto_now_add=True)
    expired_at = models.DateTimeField()
    is_published = models.BooleanField(default=False)
    photo = models.ImageField(upload_to="food_photos/", null=True, blank=True)

    def is_expired(self):
        return self.expired_at < timezone.now()

    @property
    def is_empty(self):
        return self.quantity == 0


class Order(models.Model):
    STATUS_PENDING = "P"
    STATUS_SUCCESS = "S"
    STATUS_CANCELLED = "C"
    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_SUCCESS, "Success"),
        (STATUS_CANCELLED, "Cancelled"),
    ]
    placed_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES, default=STATUS_PENDING
    )


class OrderItem(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="item")
    food = models.ForeignKey(Food, on_delete=models.PROTECT, related_name="order_item")
    quantity = models.PositiveSmallIntegerField()
