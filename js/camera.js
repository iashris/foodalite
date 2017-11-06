 // Create a root reference
var storageRef = firebase.storage().ref();
var ref = storageRef.child('images/ashris.jpg');


 function handleFileSelect(evt) {
            var files = evt.target.files; // FileList object

            // files is a FileList of File objects. List some properties.
            var output = [];
            for (var i = 0, f; f = files[i]; i++) {
                output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                    '</li>');
                if (!f.type.match('image.*')) {
			        continue;
			      }

     		 reader = new FileReader();

      // Closure to capture the file information.
   			   reader.onload = (function(theFile) {
			        return function(e) {
			          // Render thumbnail.
			          var span = document.createElement('span');
			          span.innerHTML = ['<img class="thumb" src="', e.target.result,
			                            '" title="', escape(theFile.name), '"/>'].join('');
			          document.getElementById('list').insertBefore(span, null);
			        };
			      })(f);

      // Read in the image file as a data URL.
      				reader.readAsDataURL(f);
            }
            document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
            document.getElementById('upload').style.visibility="visible";
        }

        document.getElementById('files').addEventListener('change', handleFileSelect, false);
        function upload(){
        	var message=reader.result;
        	ref.putString(message, 'data_url').then(function(snapshot) {
  			console.log('Uploaded a data_url string!');
});
        }