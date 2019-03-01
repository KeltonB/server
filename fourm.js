var fs = require('fs');
const Papa = require("papaparse");
// spot [0] is username
//spot [1] is post content
var file;
var start = `
<!DOCTYPE html>
<html>
<head>
<style>
    p {
  border: 1px solid black;
  padding: 10px;
}
</style>
</head>
<body>
 <h1>This is kelton's fourm</h1>`;

    var end = `<a href="index.html">Home</a>
    </body>
    </html>`;
class fourm{
    
    constructor(f){
         file = f;
    }
    post(u,m){
        fs.readFile(file, 'utf-8' ,function(err, buf) {
            var len;
            var p;
            var text;
            //var file = this.f;
            text = buf.toString();
            p = Papa.parse(text);
            console.log(p);
            len = p.data[0].length
            if(p.data[1].length != len){
                console.log("Critical fourm database fault");
                process.exit(404);
            }
            p.data[0][len] = u;
            p.data[1][len] = m;
            fs.writeFile(file, Papa.unparse(p), function(err, data){
                if (err) console.log(err);
                //console.log("Successfully Written to File.");
            });

          });
    }

    getHtml(){
        var toAdd = ""
        fs.readFile(file, 'utf-8' ,function(err, buf) {
            var len;
            var p;
            var text;
            text = buf.toString();
            p = Papa.parse(text);
            console.log(p);
            len = p.data[0].length
            if(p.data[1].length != len){
                console.log("Critical fourm database fault");
                process.exit(404);
            }
            for(var i = 0; i<len; i++){
                toAdd = toAdd +`<h2>${p.data[0][i]}:</h2><br><p>${p.data[1][i]}</p>`;
            }
            return(start+toAdd+end);
          });
        
    }

}
