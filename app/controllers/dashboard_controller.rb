class DashboardController < ApplicationController

	before_filter :authenticate_user!
	
	def index
	  	# puts current_user[:email]
	  	# puts user_signed_in?
	  	# puts user_session
	end

end
