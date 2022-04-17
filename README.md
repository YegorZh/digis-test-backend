# Digital Suits Test Backend

<h2>Scripts</h2>
<h3>npm start</h3>
<p>Starts server from build at localhost:8000</p>

<h3>npm dev</h3>
<p>Starts server using nodemon at localhost:8000</p>

<h3>npm build</h3>
<p>Builds server to build folder</p>
<h2>Endpoints</h2>
<h3>/books</h3>
<ul>
 <li>GET: res contains all of the books</li>
 <li>POST: posts single book to db</li>
</ul>
<h3>/books/:id</h3>
<ul>
 <li>GET: res contains book with the specified id</li>
 <li>PATCH: updates book with the given id</li>
 <li>DELETE: deletes book with the stated id</li>
</ul>
  <h2>Schema</h2>
    <p>For successful POST body must contain following string fields:
    <ul> 
     <li>title</li>
    <li>author</li>
    <li>genre</li>
    <li>published</li>
    <li>pages</li>
    <li>shortDescription</li>
    </ul>
    Aforementioned fields have no specific validations, except those for string type and for fields being present.
    </p>
    <p>Also there is one optional field <ul><li>image</li></ul> that must contain a link leading to an image.</p>
<hr>
<h4>P.S.</h4>
<p>Frontend can be found <a href="https://github.com/YegorZh/digis-test-frontend">here</a></p>
