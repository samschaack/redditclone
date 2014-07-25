module Api
  class UsersController < ApiController
    wrap_parameters :user, include: [:username, :password]
    
    def create
      @user = User.new(user_params)
      @user.reset_token!
      
      if @user.save
        sign_in(@user)
        
        #subscribe user to default subs
      
        User.first.owned_subs.each do |sub|
          SubMembership.create({ user_id: @user.id, sub_id: sub.id })
        end
        
        render json: @user
      else
        flash[:errors] = @user.errors.full_messages
        render json: @user.errors.full_messages
      end
    end
    
    def destroy
      
    end
    
    def show
      @user = User.find(params[:id])
      render json: @user
    end
    
    private
    
    def user_params
      params.require(:user).permit(:username, :password)
    end
  end
end