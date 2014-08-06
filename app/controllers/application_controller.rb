class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  helper_method :current_user, :signed_in?, :sign_out
  
  private
  
  def sign_in(user)
    @current_user = user
    session[:token] = user.reset_token!
  end
  
  def sign_out
    if signed_in?
      current_user.reset_token!
      session[:token] = nil
    end
  end
  
  def signed_in?
    !!current_user
  end
  
  def current_user
    return @current_user if @current_user
    
    if session[:token]
      @current_user = User.find_by_token(session[:token])
    elsif (header = request.headers['Authorization'].to_s.sub('Basic ', '')) != ''
      header = Base64.decode64(header).split(':')
      username = header.shift
      password = header.join(':')
      @current_user = User.authenticate(username, password)
    end
  end
  
  def require_signed_in!
    return if current_user
    
    respond_to do |format|
      format.json { render text: 'unauthorized', status: 'unauthorized' }
    end
  end
end