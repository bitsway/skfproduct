


var achPhoto="";
var achPhoto2="";
var imageName = "";
var imageName2 = "";
var imagePathA="";
var imagePath2B="";

var latitude="";
var longitude="";
var upListFlag=0;
// #######################
var lat;
var long;


function getLocationInfoAch() {	
	var options = { enableHighAccuracy: false};	
	navigator.geolocation.getCurrentPosition(onSuccess, onError, options);				
	$(".errorChk").html("Confirming location. Please wait.");
}
// onSuccess Geolocation
function onSuccess(position) {
	$("#ach_lat").val(position.coords.latitude);
	$("#ach_long").val(position.coords.longitude);
	$(".errorChk").html("Location Confirmed");
}
function onError(error) {
   $("#ach_lat").val(0);
   $("#ach_long").val(0);
   $(".errorChk").html("Failed to Confirmed Location.");
}

var apipath="http://104.199.176.230/skfproduct/syncmobile/";

 url ="";


$(document).ready(function(){
			
var articlecategoryStr="";
		$.ajax({
			  url:apipath+'article_category?cid=ARTICLE_VIEWER',
			  success: function(resStr) {	
				  articlecategoryStr=resStr.split("||");
				  var articleListS='<ul data-role="listview"  data-inset="true" >';
				  //alert(articlecategoryStr);
				  for (i=0;i<articlecategoryStr.length;i++){
					  articleLi=articlecategoryStr[i].split("-");
					  var articleNam=articleLi[0];
					  var articleImg=articleLi[1];
					  articleListS+='<li style="margin-bottom:1px;" onClick="article_name(\''+articleNam+'\')" ><a class="resize_a"><img src="'+articleImg+'" style="padding-top:10px;"/></a></li>'
						  /*articleListS+='<li style="margin-bottom:1px;" onClick="article_name(\''+articleNam+'\')" ><a class="resize_a"><img src="image/'+articleImg+'" style="padding-top:10px;"/></a></li>'*/
					  
				   }	
				  articleListS+='</ul>';
				  
				$('#articleCatDiv').empty();
				$('#articleCatDiv').append(articleListS).trigger('create');			
			
			  }
			  })
			  	
			url = "#homePage";
	$.mobile.navigate(url);
	
	
});

function syncBasic() {
					
		var mobile=$("#mobile").val() ;
	 	var password=$("#password").val() ;
		
		if (mobile=="" || password==""){
			 $(".errorMsg").html("Required mobile no and password");	
		 }else{	
			 $('#syncBasic').hide();			 
			 $(".errorMsg").html("Sync in progress. Please wait...");
			if(localStorage.sync_code==undefined || localStorage.sync_code==""){
					localStorage.sync_code=0
				}
		
		 	//alert(apipath+'passwordCheck?cid=ARTICLE_VIEWER&mobile='+mobile+'&password='+encodeURIComponent(password)+'&sync_code='+localStorage.sync_code);
			$.ajax({
			  url:apipath+'passwordCheck?cid=ARTICLE_VIEWER&mobile='+mobile+'&password='+encodeURIComponent(password)+'&sync_code='+localStorage.sync_code,
			  success: function(result) {
				syncResult=result
				//alert(syncResult);
				var syncResultArray = syncResult.split('rdrd');
					localStorage.synced=syncResultArray[0];
					if (localStorage.synced=='YES'){	
						localStorage.sync_code=syncResultArray[1];
						//localStorage.upazilaList=syncResultArray[2];						
						
						localStorage.mobile_no=mobile;
						
						
						$(".errorMsg").html("Sync Successful");
						
						$('#syncBasic').show();
						
						
						url = "#homePage";
						$.mobile.navigate(url);
												
					}else{
						
						$(".errorMsg").html("Sync Failed. Authorization or Network Error.");
						$('#syncBasic').show();
					}
				
			  }//----/success f
			});//------/ajax
			
		 }//-----/field
			
	}
	

function menuClick(){
		$(".errorChk").text("");
		$(".sucChk").text("");
		
		$("#btn_take_pic").show();
		$("#btn_ach_lat_long").show();
		
		$('#up_list_search').val('');
		
		url = "#homePage";
		$.mobile.navigate(url);
	
	}
//----------------back button
function backClick(){
	
	$(".errorChk").text("");
	}

// my requestForm work start here  ########################################################

function myRequestForm(){
			var email=$("#email").val();
			var emailCheck =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
			
			var mobile= $("#mobile").val();
			
			if(!mobile==""){
				mobile= 88+mobile;
				}
			var remark=$("#remark").val();
			var name=$("#name").val();
			
			var lat = $("#ach_lat").val();
			var long = $("#ach_long").val();
			
			if(email == "" & mobile == ""){
				$(".errorReq").text("Email or Mobile required !!");
			}
			
			else if(!email.match(emailCheck)){
				$(".errorReq").text("Invalid email format !!");
				}
				
			
			else{
				$.ajax({
						url: apipath+'insertRequestData?cid=ARTICLE_VIEWER&email='+email+'&mobile='+mobile+'&remark='+remark+'&name='+name+'&lat='+lat+'&long='+long,
						success: function(resStr) {
								if(resStr == 'Success'){
									$(".errorReq").text("Request Submitted");
									url="#leftpanel";					
									$.mobile.navigate(url);
								}else{
									$(".errorReq").text("Failed to save");
									url="#leftpanel";					
									$.mobile.navigate(url);
									}
								
							}
					});
				}
			
		}

function searchData(){
	var searchValue=$("#searchValue").val();
	
	if (searchValue==""){
		$(".error").text("Empty Search Value");
	}else{
		$.ajax({
			  url: apipath+'search_keyword?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&searchValue='+searchValue,
			  success: function(resStr) {	// ******************************************************************************************	
			
				if (resStr!=""){
					keywordStr=resStr.split("||");
					  
					  var keywordS='';
					  
					  for (i=0;i<keywordStr.length;i++){
						  keywordLi=keywordStr[i].split("-")
						 //alert(keywordLi);
						  
						  var article_name=keywordLi[0];
						  var article_generic=keywordLi[1]
						  var article_introduction=keywordLi[2];
						  var thName=keywordLi[3];
						  var thClass=keywordLi[4].split("<thCl>")
						  //alert(thClass);
						  keywordS+='<a style="margin-bottom:1px; color:#ffffff; display:block;" >'+article_name+'</a>' 
						  keywordS+='<a style="margin-bottom:1px; color:#ffffff;" >'+article_generic+'</a>' 
						  keywordS+='<p style="padding:7px; border-radius:5px">'+article_introduction+'</p>'
						  keywordS+='<h3 style="padding:5px 0px;" >'+"Products From "+thName+" :"+'</h3>'
						  keywordS+='<p style="border-top:2px dashed #ffffff"></p>';
						  keywordS+='<a href="" style="text-decoration:none; color:#ffffff">';
						for(i=0; i<thClass.length; i++){
							thaClassSplit = thClass[i].split("|");
							var th_s_name = thaClassSplit[0];
							var th_s_img = thaClassSplit[1];
							//alert(th_s_name);
							//articleNameS+=thClass[i]+' '
							keywordS+='<a href=""  onClick="article_name2(\''+th_s_name+'\')" ><img src="'+th_s_img+'"  style="background-color:#ffffff; margin:2px; border-radius:2px; width:150px; height:50px"/></a>'
							}
							
					 keywordS+='</a>';
						  
						  
					  }
						////////////////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\  
					  keywordS+='';
					  
					$('#articlePageDiv').empty();
					$('#articlePageDiv').append(keywordS).trigger('create');
					 
					$(".error").text("");
					  //url="#second_page";
					  url="#third_page";					
					  $.mobile.navigate(url);
				
				
				}else{
					$(".error").text("Invalid keywords");
				}
			
			  }
			
		});	
		
	}

}

function articleSubcategory(category){
	 
	localStorage.category=category;
	$("#showCategory").html(localStorage.category);	

 
	var articleSubcatStr="";
		// For error checking in database 
	 	//alert(apipath+'article_subCategory?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&category='+localStorage.category);
		$.ajax({
			  url:apipath+'article_subCategory?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&category='+localStorage.category,
			  success: function(resStr) {	
				  
				  articleSubcatStr=resStr.split(",");
				  
				  var articleSubCatS='<ul data-role="listview" data-filter="true" data-inset="true" data-input="#rich-autocomplete-input">';
				  
				  for (i=0;i<articleSubcatStr.length;i++){
					  articleSubCatLi=articleSubcatStr[i].split("<fd>")
					  
					  					  
					  for (j=0;j<articleSubCatLi.length;j++){
						  articleSubCatS+='<li style="margin-bottom:1px;" onClick="article_name(\''+articleSubCatLi+'\')" ><a>'+articleSubCatLi+'</a></li>' 
						  }
					  
				  	  				  				  
				  }	
				  articleSubCatS+='</ul>';
				  
				$('#articleSubCatDiv').empty();
				$('#articleSubCatDiv').append(articleSubCatS).trigger('create');
				 
				  url="#first_page";					
				  $.mobile.navigate(url);
				  				  
			  }
			});
	
}

function article_name(name){
	localStorage.name=name;
	$("#showSubCategory").html(localStorage.name);	

 //alert(apipath+'article_name?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&name='+localStorage.name);
	var articleNameStr="";
		$.ajax({
			  url:apipath+'article_name?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&name='+localStorage.name,
			  
			  success: function(resStr) {
				  articleNameStr=resStr.split("||");
				  //alert(articleNameStr);
				  var articleNameS='';
				  
				  for (i=0;i<articleNameStr.length;i++){
					  articleNameLi=articleNameStr[i].split("-");
					  
					  var article_id=articleNameLi[0];
					  var article_name=articleNameLi[1];
					  var article_introduction=articleNameLi[2];
					  articleNameS+='<a style="margin-bottom:1px; color:#ffffff;" onClick="article_page(\''+article_id+'\')" >'+article_name+'</a>' 
						
					  articleNameS+='<p style="padding:5px 0px;" onClick="article_page(\''+article_id+'\')" >'+article_introduction+'</p>'
					  
					  var thName=articleNameLi[3];
					  articleNameS+='<h3 style="padding:5px 0px;" >'+"Products From "+thName+" :"+'</h3>'
					  articleNameS+='<p style="border-top:2px dashed #ffffff"></p>';
					  
					  var thClass=articleNameLi[4].split("<thCl>")
					 //alert(thClass);
					  articleNameS+='<a href="" style="text-decoration:none; color:#ffffff">';
						for(i=0; i<thClass.length; i++){
							thaClassSplit = thClass[i].split("|");
							var th_s_name = thaClassSplit[0];
							var th_s_img = thaClassSplit[1];
							//alert(th_s_name);
							//articleNameS+=thClass[i]+' '
							articleNameS+='<a href=""  onClick="article_name2(\''+th_s_name+'\')" ><img src="'+th_s_img+'"  style="background-color:#ffffff; margin:2px; border-radius:2px; width:150px; height:50px"/></a>'
							}
					 articleNameS+='</a>';	 
					  
				  }
				  	  
				  articleNameS+='';
				  
				$('#articleNameDiv').empty();
				$('#articleNameDiv').append(articleNameS).trigger('create');
				 
				  url="#second_page";					
				  $.mobile.navigate(url);
				  				  
			  }
			});
	
}

// Here is the copy of article name 2   /////////// Start

function article_name2(name1){
	localStorage.name1=name1;
	$("#showSubCategory").html(localStorage.name1);	

	var articleNameStr="";
	 	
		$.ajax({
			
			  url:apipath+'article_name2?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&name1='+localStorage.name1,
			  
			  success: function(resStr) {	
				  articleNameStr=resStr.split("||");
				  //alert(articleNameStr);
				  var articleNameS='';
				  
				  for (i=0;i<articleNameStr.length;i++){
					  articleNameLi=articleNameStr[i].split("-")
					  
					  var article_id=articleNameLi[0];
					  var article_name=articleNameLi[1];
					  var article_introduction=articleNameLi[2];
					  articleNameS+='<a style="margin-bottom:1px; color:#ffffff;" onClick="article_page(\''+article_id+'\')" >'+article_name+'</a>' 
						
					  articleNameS+='<p style="padding:5px 0px;" onClick="article_page(\''+article_id+'\')" >'+article_introduction+'</p>'
					  
					  var thName=articleNameLi[3];
					  articleNameS+='<h3 style="padding:5px 0px;" >'+"Products From "+thName+" :"+'</h3>'
					  articleNameS+='<p style="border-top:2px dashed #ffffff"></p>';
					  var thClass=articleNameLi[4].split("<thCl>")
					 
					  articleNameS+='<a href="" style="text-decoration:none; color:#ffffff">';
						for(i=0; i<thClass.length; i++){
							//articleNameS+=thClass[i]+' '
							thaClassSplit = thClass[i].split("|");
							var th_s_name = thaClassSplit[0];
							var th_s_img = thaClassSplit[1];
							/*articleNameS+='<a href=""  onClick="article_name(\''+article_id+'\')" ><img src="image/'+th_s_img+'"  style="background-color:#ffffff; margin:2px; border-radius:2px; width:150px; height:50px"/></a>'*/
							articleNameS+='<a href=""  onClick="article_name2(\''+th_s_name+'\')" ><img src="'+th_s_img+'"  style="background-color:#ffffff; margin:2px; border-radius:2px; width:150px; height:50px"/></a>'
							}
					 articleNameS+='</a>';	 
					  
				  }
				  	  
				  articleNameS+='';
				  
				$('#articleNameDiv').empty();
				$('#articleNameDiv').append(articleNameS).trigger('create');
				 
				  url="#second_page";					
				  $.mobile.navigate(url);
				  				  
			  }
			});
	
}

// Here is the copy of article name 2   /////////// End



function article_page(article){
	localStorage.article_id=article; 
	localStorage.pageNo=1;
	var articlepageStr="";
	 	//alert(apipath+'article_page?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&pageNo='+localStorage.pageNo+'&article_id='+localStorage.article_id);
		$.ajax({
			  url:apipath+'article_page?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&pageNo='+localStorage.pageNo+'&article_id='+localStorage.article_id,
			  success: function(resStr) {	
				  
				  resultStr=resStr.split("<fd>");
							  	
					 if (resultStr[0]=="Success"){
						  var pageStr=resultStr[1].split("fdfd");	
						  					  
						   var page_Sl=pageStr[0];
						   var page_content=pageStr[1];
						   var page_no=pageStr[2];
						   var page_count=pageStr[3];
						   
						  var articlePageS='';
												  
							  articlePageS+='<p style="padding-bottom:5px; ">'+page_content+'</p>'		
						  
						  articlePageS+='';
						  
						$('#articlePageDiv').empty();
						$('#articlePageDiv').append(articlePageS).trigger('create');  
					//===============Pageing_start	
					var pageingRow='<tr><td class="page_border"></td>';
				
					if (page_no==1){
						var nexPageNo=eval(page_no)+1;	
						
						pageingRow+='<td class="page_border"><input type="button" name="" id="" class="btn" onclick=newPageNo("'+nexPageNo+'") value="next >" /></td>'
						
					}else{
						
						var nexPageNo=eval(page_no)+1;
						var previousPageNo=eval(page_no)-1;	
				
						pageingRow+='<td class="page_border"><input type="button" name="" id="" class="btn" onclick=newPageNo("'+previousPageNo+'") value="< previous" /></td>&nbsp;&nbsp;'+previousPageNo
						
						pageingRow+='<td class="page_border"><input type="button" name="" id="next" class="btn" onclick=newPageNo("'+nexPageNo+'") value="next >" /></td>'+nexPageNo
						
						}
					
					pageingRow+="</tr>";
					
					$("#paging").append(pageingRow);
						  
					 }
				
				  url="#third_page";					
				  $.mobile.navigate(url);
				  				  
			  }
			});
				
}


  				  
function newPageNo(page){
	
	localStorage.page_no=page;
	
	$.ajax({
			  url:apipath+'article_page?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&pageNo='+localStorage.page_no+'&article_id='+localStorage.article_id,
			  success: function(resStr) {	
				  
				  resultStr=resStr.split("<fd>");
							  	
					 if (resultStr[0]=="Success"){
						  var pageStr=resultStr[1].split("fdfd");	
						  					  
						   var page_Sl=pageStr[0];
						   var page_content=pageStr[1];
						   var page_no=pageStr[2];
						   var page_count=pageStr[3];
						  // alert(page_no);
						  var articlePageS='';
												  
							  articlePageS+='<p style="padding-bottom:5px; ">'+page_content+'</p>'		
						  
						  articlePageS+='';
						  
						$('#articlePageDiv').empty();
						$('#articlePageDiv').append(articlePageS).trigger('create');  
						
						
					 }
			  }
	})
}