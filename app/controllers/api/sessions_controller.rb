module Api
  class SessionsController < ApiController
    respond_to :json
    wrap_parameters :user, include: [:username, :password]
    
    def create
      @user = User.authenticate(params[:user][:username], params[:user][:password])
      
      if @user
        sign_in(@user)
        respond_with @user, location: '#', notice: 'Signed In!'
      else
        respond_to do |format|
          format.json { render json: { error: 'Invalid Username/Password Combo', info: params[:user][:password] }}
        end
      end
    end
    
    def destroy
      sign_out
      respond_to do |format|
        format.json { head :ok }
      end
    end
    
    private
    
    def session_params
      params.require(:user).permit(:username, :password)
    end
  end
end