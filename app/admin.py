from django.contrib import admin
from .models import Contact,TechnicalAssistance,RaiseAIssue,RequestCancellation,ConnectNow
# Register your models here.


class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'mobile', 'email', 'address', 'requirement', 'date')  # show all fields

class TechnicalAssistanceAdmin(admin.ModelAdmin):
    list_display = ('icon', 'link', 'title', 'date')  # show all fields

class RaiseaIssueAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'middle_name', 'last_name', 'email','address1','address2','city','state','zipcode','date_of_transaction','invoice_no','transaction_Amount','reason_for_canceling','bank_name','others','type_of_account','online_banking','contact_number','landline_number','refund_policy','date')  # show all fields


admin.site.register(Contact,ContactAdmin)
admin.site.register(TechnicalAssistance,TechnicalAssistanceAdmin)
admin.site.register(RaiseAIssue,RaiseaIssueAdmin)
admin.site.register(RequestCancellation)
admin.site.register(ConnectNow)

