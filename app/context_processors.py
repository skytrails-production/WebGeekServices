# myapp/context_processors.py

from .models import RequestCancellation

def cancellation_link(request):
    cancellation = RequestCancellation.objects.first()  # Get the first cancellation request (or customize as per your need)
    return {
        'cancellation': cancellation  # Make this accessible in the template
    }
