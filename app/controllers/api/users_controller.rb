module Api
  class UsersController < ApiController
    def create
      
    end
    
    def destroy
      
    end
    
    def index
      
    end
    
    def show
      @user = User.find(params[:id])
      render json: @user
    end
    
    private
    
    def board_params
      params.require(:user).permit(:username, :email, :points)
    end
  end
end