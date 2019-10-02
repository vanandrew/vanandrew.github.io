---
layout: default
---

# Posts

{% for post in site.posts %}
  <div class="card post">
    <div class="card-header">
    {{ post.date | date: '%d %B %Y' }} - <a href="{{ post.url }}">{{ post.title }}</a>
    </div>
    <div class="card-body">
      {{ post.excerpt }}
    {% if post.tags %}
    <p>
      <small>tags: <span class="badge badge-primary">{{ post.tags | join: "</span> <span class='badge badge-primary'>" }}</span></small>
    </p>
    {% endif %}
    </div>
  </div>
{% endfor %}