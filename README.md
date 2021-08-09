
<h1 align="center">
 BSALES A TEST PROJECT
</h1>

<p align="center">
   📄 🚀
</p>


## What’s In This Document

- [Requirement](#-requirement)
- [API TYPE](#-learning-gatsby)
- [Start the project :D](#-get-up-and-running-in-5-minutes)



## ❗ Requirement

You need have npm (nodejs) installed on your machine. If you have bsale api url, you can config it in the [.env](.env) file as MYSQL_HOST_URL = URL;


## 🚢 Tables TYPES

<table>
<tbody>
<tr>
<td colspan="2">
<p><strong>product</strong></p>
</td>
</tr>
<tr>
<td>
<p><strong>id&nbsp;</strong></p>
</td>
<td>
<p><span style="font-weight: 400;">Identificador &uacute;nico del producto (int)</span></p>
</td>
</tr>
<tr>
<td>
<p><strong>name&nbsp;</strong></p>
</td>
<td>
<p><span style="font-weight: 400;">Nombre del producto (varchar)</span></p>
</td>
</tr>
<tr>
<td>
<p><strong>url_image&nbsp;</strong></p>
</td>
<td>
<p><span style="font-weight: 400;">URL de la imagen asociada al producto (varchar)</span></p>
</td>
</tr>
<tr>
<td>
<p><strong>price&nbsp;</strong></p>
</td>
<td>
<p><span style="font-weight: 400;">Precio de venta del producto (float)</span></p>
</td>
</tr>
<tr>
<td>
<p><strong>discount&nbsp;</strong></p>
</td>
<td>
<p><span style="font-weight: 400;">Porcentaje de descuento del producto (int)</span></p>
</td>
</tr>
<tr>
<td>
<p><strong>category&nbsp;</strong></p>
</td>
<td>
<p><span style="font-weight: 400;">Identificador de la categor&iacute;a (int)</span></p>
</td>
</tr>
</tbody>
</table>
<p><br /><br /></p>
<table>
<tbody>
<tr>
<td colspan="2">
<p><strong>category</strong></p>
</td>
</tr>
<tr>
<td>
<p><strong>id&nbsp;</strong></p>
</td>
<td>
<p><span style="font-weight: 400;">Identificador &uacute;nico de la categor&iacute;a (int)</span></p>
</td>
</tr>
<tr>
<td>
<p><strong>name&nbsp;</strong></p>
</td>
<td>
<p><span style="font-weight: 400;">Nombre de la categor&iacute;a (varchar)</span></p>
</td>
</tr>
</tbody>
</table>
<br /><br />


## 🚀 Get Up and Running 

1. **Config your database.**

    Config your mysql database  on src/config/mysql.js

    ```shell
    config = {
        host: process.env.MYSQL_HOST_URL,
        user: "bsale_test",
        password: "bsale_test",
        database: "bsale_test",
        insecureAuth: true,
     };
    ```

2. **Install dependencies.**

    run in your shell machine the next command:

   ```shell
   npm install 
   ```



3. **Start the project :D.**

   Start the api and the client side application following this command:

   ```shell
    npm start
   ```

   Open your browser and navigate to [http://localhost:2424](http://localhost:2424).
## 📝 License

Licensed under the [MIT License](./LICENSE).
