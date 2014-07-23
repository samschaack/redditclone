class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  helper_method :current_user, :signed_in?
  
  def current_user
    
  end
  
  def sign_in(user)
    
  end
  
  def sign_out
    
  end
  
  def require_signed_in!
    
  end
  
  def signed_in?
    
  end 
end
