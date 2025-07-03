from django.urls import path
from .views import home_view, fonctionnement_view, services_view, about_view, contact_view, tarifs_view

urlpatterns = [
    path('', home_view, name='home'),
    path('fonctionnement/', fonctionnement_view, name='fonctionnement'),
    path('services/', services_view, name='services'),
    path('about/', about_view, name='about'),
    path('contact/', contact_view, name='contact'),
    path('tarifs/', tarifs_view, name='tarifs'),
]
