from django.db import models

# Create your models here.

class Contact(models.Model):
    name = models.CharField(max_length=255)
    mobile = models.CharField(max_length=10)
    email = models.EmailField(max_length=100)
    address = models.CharField(max_length=255)
    requirement = models.TextField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)



class TechnicalAssistance(models.Model):
    icon = models.ImageField(upload_to='TechnicalAssistance',null=True,blank=True)
    link = models.URLField(max_length=500, null=True, blank=True)
    title = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)



class RaiseAIssue(models.Model):
    first_name = models.CharField(max_length=255,null=True,blank=True)
    middle_name = models.CharField(max_length=255,null=True,blank=True)
    last_name = models.CharField(max_length=255,null=True,blank=True)
    email = models.EmailField(max_length=255,null=True,blank=True)
    address1 = models.CharField(max_length=255,null=True,blank=True)
    address2 = models.CharField(max_length=255,null=True,blank=True)
    city = models.CharField(max_length=255,null=True,blank=True)
    state = models.CharField(max_length=255,null=True,blank=True)
    zipcode = models.CharField(max_length=10,null=True,blank=True)
    date_of_transaction = models.DateField(max_length=255,null=True,blank=True)
    invoice_no = models.CharField(max_length=244,null=True,blank=True)
    transaction_Amount = models.CharField(max_length=255,null=True,blank=True)
    reason_for_canceling = models.CharField(max_length=255,null=True,blank=True)
    bank_name = models.CharField(max_length=255,null=True,blank=True)
    others = models.CharField(max_length=255,null=True,blank=True)
    type_of_account = models.CharField(max_length=255,null=True,blank=True)
    online_banking = models.BooleanField(default=False)
    contact_number = models.CharField(max_length=255,null=True,blank=True)
    landline_number = models.CharField(max_length=255,null=True,blank=True)
    refund_policy = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)


class RequestCancellation(models.Model):
    link = models.URLField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.link
    

    
