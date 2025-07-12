

from django.urls import path
from .views import *

urlpatterns = [
    path('', home,name="home"),
    path('About/', about,name="about"),
    path('PlanandProtection/', protection,name="protection"),
    path('OrderandClaim/', status,name="status"),
    path('Form/', raiseissue,name="raise_a_issue"),
    path('Support/', technical_assistant,name="technical_assistant"),
    path('faq/', faq,name="faq"),
    path('Contact/', contact,name="contact"),
    path('Subscription/', subscription,name="subscription"),
    
]
