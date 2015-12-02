(function(){
	brite.registerView("GithubIssue",{emptyParent:false},{
		create:function(data,config){
			return app.render("tmpl-GithubIssue",{
				issue:data.issue,
				comments:data.comments,
				layout:data.layout
				});
		},
		events:{
			"click;.dialogCloseBtn":function(event){
				this.$el.remove();
			},
			"click;.btn.cancel":function(event){
				this.$el.remove();
			}
		}
	});
})();