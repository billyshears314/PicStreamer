class HomeController < ApplicationController
skip_before_action :verify_authenticity_token
  def index
  		#@instagram = Instagram.user_recent_media(18808115, {:count => 100})
  		#@instagram = Instagram.media_search("42.4581851","71.0636320", {:count => 10})
  		#puts JSON.pretty_generate(Instagram.media_search("42.4581851", "71.0636320", {:count => 10}))
  		
		#puts JSON.pretty_generate(Instagram.tag_recent_media('80sfitness', {:count =>3})) 		
  		#@instagram = Instagram.tag_recent_media('london', {:count =>2})
  		#@instagram = Instagram.tag_recent_media('nature', {:count =>1})
  		#@instagram = Instagram.location_search("42.6581851", "71.0636320", "5000");
  		
  		#@instagram = JSON.parse(open('https://api.instagram.com/v1/tags/snow/media/recent?access_token=1556033661.c63490d.ee734efca8054caf93a38a37c251e0d3'))
  		
  		#puts JSON.pretty_generate(@instagram);
  		
  end
  
  def update
  	@instagram = Instagram.tag_recent_media(params[:search], {:count =>33})
  		respond_to do |format|
  			#format.html {redirect_to '/'}
  			#format.js
  			format.json { render json: @instagram }
  		end
  end
end
