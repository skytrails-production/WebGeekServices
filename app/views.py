from django.shortcuts import render,redirect
from .models import Contact,TechnicalAssistance,RaiseAIssue,RequestCancellation

# Create your views here.

def home(request):
   
    return render(request,'app/home.html')

def about(request):
    return render(request,'app/about.html')


def protection(request):
    return render(request,'app/protection.html')

def status(request):
    return render(request,'app/OrderandClaim.html')

def raiseissue(request):
    if request.method == 'POST':
        fname = request.POST.get('FName')
        mname = request.POST.get('MName')
        lname = request.POST.get('LName')
        email = request.POST.get('Email')
        address = request.POST.get('Addres')
        address2 = request.POST.get('Addres2')
        city = request.POST.get('City')
        state = request.POST.get('State')
        Zip = request.POST.get('Zip')
        transaction_date = request.POST.get('TransactionDate')
        invoice_no = request.POST.get('InvoiceNo')
        transaction_amt = request.POST.get('TransactionAmt')
        # reason_cancel = request.POST.get('ctl00$ContentPlaceHolder1$cblReasonforCancel$0')
        selected_reasons = request.POST.getlist('cblReasonforCancel')
        reason_cancel_other = request.POST.get('ReasonCancelOth', '')
        bank_name = request.POST.get('BankName')
        others = request.POST.get('BankNameOth')
        selected_accounts = request.POST.getlist('cblTypeOfAccount') 
        type_of_ac = request.POST.get('TypeOfAccountOth', '')
        
        # type_of_ac = request.POST.get('TypeOfAccountOth')
        # type_of_account = request.POST.get('ctl00$ContentPlaceHolder1$cblTypeOfAccount$cblTypeOfAccount_0')
        online_banking = request.POST.get('OnlineBanking')
        contact_no = request.POST.get('Phone')
        landline_no = request.POST.get('PhoneOpt')
        proceed_cancel  = request.POST.get('ProceedCancel')
        # proceed_cancel = proceed_cancel_raw == "True"


        if 'Other' in selected_reasons and reason_cancel_other:
            selected_reasons.append(reason_cancel_other)

        if 'Other' in selected_accounts and type_of_ac:
            selected_accounts.append(type_of_ac)


        issue = RaiseAIssue.objects.create(first_name=fname,middle_name=mname,last_name=lname,email=email,address1=address,address2=address2,city=city,state=state,zipcode=Zip,date_of_transaction=transaction_date,invoice_no=invoice_no,transaction_Amount=transaction_amt,reason_for_canceling=', '.join(selected_reasons),bank_name=bank_name,others=others,type_of_account=', '.join(selected_accounts),online_banking=online_banking,contact_number=contact_no,landline_number=landline_no,refund_policy=proceed_cancel)
        
        issue.save()
        return redirect('raise_a_issue')
    
    return render(request,'app/Form.html')

def technical_assistant(request):
    technical_assistant = TechnicalAssistance.objects.all()
    context = {
        'technical_assistant':technical_assistant
    }
    return render(request,'app/Support.html',context)

def faq(request):
    return render(request,'app/faq.html')

def contact(request):
    if request.method == "POST":
        name= request.POST.get('name')
        mobile= request.POST.get('mobile')
        email= request.POST.get('Email')
        address= request.POST.get('Address')
        requirement= request.POST.get('Requirement')
        contact = Contact.objects.create(name=name,mobile=mobile,email=email,address=address,requirement=requirement)
        contact.save()
        return redirect('contact')

        

    return render(request,'app/Contact.html')


def subscription(request):
    return render(request,'app/subscription.html')