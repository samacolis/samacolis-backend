from django.shortcuts import render

def home_view(request):
    return render(request, 'home.html')

def fonctionnement_view(request):
    return render(request, 'pages/fonctionnement.html')

def services_view(request):
    return render(request, 'services.html')

def about_view(request):
    return render(request, 'about.html')

def contact_view(request):
    return render(request, 'contact.html')

def tarifs_view(request):
    return render(request, 'tarifs.html')

