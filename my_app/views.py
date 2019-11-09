import requests
from requests.compat import quote_plus
from django.shortcuts import render
from django.http import JsonResponse
from bs4 import BeautifulSoup
from . import models


def home(request):
    return render(request, 'index.html')


def new_search(request):
    search = request.POST.get('search')
    base_url = 'https://ukraine.craigslist.org/search/?query={}'
    final_url = base_url.format(quote_plus(search))
    response = requests.get(final_url)
    data = response.text
    bs = BeautifulSoup(data, features='html.parser')

    models.Search.objects.create(search=search)

    post_listings = bs.find_all('li', {'class': 'result-row'})
    final_postings = []

    for post in post_listings:
        if post:
            post_title = post.find(class_='result-title').text
            post_url = post.find('a').get('href')
            post_price = post.find(class_='result-price').text \
                if post.find(class_='result-price') \
                else 'N/A'

            final_postings.append((post_title, post_url, post_price))
        else:
            final_postings = False

    response = {
        "search": search,
        "final_postings": final_postings
    }

    return JsonResponse(response)
