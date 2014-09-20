$projectsList = $('.projects');
$addProjectBtn = $('#add-project');
$addProjectForm = $('.create-project-form');
$createProjectBtn = $('.create-project.btn');
$importProjectBtn = $('#import-project');

var projectsArr = [];
var fileEntry;

chrome.storage.local.get("projects", function(data) { 
	
	console.log(data);
	projectsArr = data.projects || [];
	console.log(projectsArr);
	console.log("projects");
	if (!projectsArr.length) {
		$projectsList.html("No projects...");
	}

	_.each(projectsArr, function(project) {
		$projectsList.add('<li>' + project.name + '</li>');
	});

});

console.log($addProjectBtn);

$addProjectBtn.click(function() { 
	$addProjectForm.fadeIn();
	$addProjectBtn.hide();
});

function setEntry(anEntry, isWritable, name) {
	  fileEntry = anEntry;
	  gotWritable = isWritable;
	  if (fileEntry) {
	    //updateModeForBaseName(fileEntry.name);
	  } else if (name) {
	    //updateModeForBaseName(name);
	  }
	  //updatePath();
}

var directoryEntry = null;
function openFile() {
	chrome.fileSystem.chooseEntry("openDirectory", function (entry) {
	  	console.log("entry");
	  	directoryEntry = entry;
	  	console.log()
	    // if (chrome.runtime.lastError) {
	    //   showError(chrome.runtime.lastError.message);
	    //   return;
	    // }
	    // clearError();
	    // setEntry(entry, false);
	    // replaceDocContentsFromFileEntry();
	});
}

$importProjectBtn.click(openFile);

$createProjectBtn.click(function() {

	chrome.fileSystem.chooseEntry({ type: "openDirectory" }, function (directoryEntry) {

		console.log(directoryEntry);
		var projectName = $addProjectForm.find('.name').val();
		console.log(projectName);
		directoryEntry.createWriter(function(writer) {
			console.log("writer");
			writer.onwriteend = function(e) {
				console.log("file created");
			};
			
			writer.write(new Blob([document.getElementById("HTMLFile").value],
			{type: 'text/plain'})); 

		});
 
 	});

	// window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
	// 	console.log(projectName+'-project3');
	// 	console.log("fs");
	// 	console.log(fs);
		
	// 	chrome.fileSystem.getWritableEntry('~/'+projectName+'-project', function(a) {
	// 		console.log("hey");
	// 		console.log(a);
	// 	});

	//   	fs.root.getDirectory('~/'+projectName+'-project', {create: true}, function(dirEntry) {

	//   		console.log(dirEntry);

	// 		projectsArr.push({
	// 			"name" : name,
	// 			"directory" : "/"
	// 		});


	// 		console.log("arr:" + projectsArr);
	// 	  	chrome.storage.local.set({"projects" : projectsArr}, function(a) {
	// 	  		console.log("set");
	// 			console.log(a);
	// 		});

	// 	  	$addProjectForm.hide();
	// 	  	$addProjectBtn.fadeIn();

	//   	}, null);
	// }, null);

});
