[PYTHON__BADGE]: https://img.shields.io/badge/python-c5dbec?style=for-the-badge&logo=Python
[DJANGO__BADGE]: https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django
[DOCKER__BADGE]: https://img.shields.io/badge/Docker-FFFFFF?style=for-the-badge&logo=Docker
[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[NEXT__BADGE]: https://img.shields.io/badge/next-000000?style=for-the-badge&logo=nextdotjs
[TAILWIND__BADGE]: https://img.shields.io/badge/tailwindcss-cef6fd?style=for-the-badge&logo=tailwindcss
[MYSQL__BADGE]: https://img.shields.io/badge/mysql-FFFFFF?style=for-the-badge&logo=mysql
[NGINX__BADGE]: https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx

<h1 align="center" style="font-weight: bold;">Finance 💲</h1>

![python][PYTHON__BADGE]
![django][DJANGO__BADGE]
![docker][DOCKER__BADGE]
![tailwind][TAILWIND__BADGE]
![nest][NEXT__BADGE]
![typescript][TYPESCRIPT__BADGE]
![mysql][MYSQL__BADGE]
![nginx][NGINX__BADGE]

<p align="center">
 <a href="#started">Getting Started</a> • 
  <a href="#routes">Application Routes</a> •
 <a href="#colab">Collaborators</a>
</p>

<p align="center">
  <b>System for controlling and monitoring expenses.</b>
</p>

<h2 id="started">🚀 Getting started</h2>

<h3>Prerequisites</h3>

Here you list all prerequisites necessary for running your project. For example:

- [Docker](https://github.com/)

<h3>Cloning</h3>

How to clone your project

```bash
git clone https://github.com/Kenjinh/finance.git
```

<h3> Environment Variables</h2>

```yaml
#DATABASE
MYSQL_ROOT_PASSWORD={YOUR_ROOT_PASS}
MYSQL_USER={USER_TO_USE}
MYSQL_PASSWORD={USER_PASS}
MYSQL_DATABASE={SCHEMA_NAME}
MYSQL_PORT={DATABASE_PORT}
#BACKEND
DEBUG={True if on DEV or False in PROD}
ALLOWED_HOSTS='localhost,django,backend,frontend'
```

<h4> Frontend Environment Variables</h4>

```yaml
NEXTAUTH_SECRET={YOUR_SECRET_KEY}
NEXTAUTH_URL=http://localhost/auth/login
```

<h3>Starting</h3>

How to start your project

```bash
cd finance
docker compose up -d --build
```

<h2 id="routes">📍 Application Routes</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​
| route | description  
|----------------------|-----------------------------------------------------
| <kbd>/</kbd> | page that list all user info
| <kbd>/auth/login</kbd> | page to login
| <kbd>/auth/sign</kbd> | page to register
| <kbd>/dashboard</kbd> | page that contains all expenses

<h2 id="colab">🤝 Collaborators</h2>

Special thank you for all people that contributed for this project.

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/70982015?s=400&u=e949368d904154aa35da5e2ef8cfd1bae1a829a0&v=4" width="100px;" alt="Kenji Nohara Profile Picture"/><br>
        <sub>
          <b>Kenji Nohara</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
