module Api
  class SubsController < ApiController 
    wrap_parameters :sub, include: [:name, :description, :owner]
    
    def get_sub_info
      @sub = Sub.find_by_name(params[:name])
      
      if SubMembership.find_by_user_id_and_sub_id(current_user.id, @sub.id)
        @submember = "yes"
      else
        @submember = "no"
      end
      
      render :sub_info
    end
    
    def create
      @sub = Sub.new({ name: params[:sub][:name], description: params[:sub][:description] })
      
      owner_id = User.find_by_username(params[:owner]).id
      @sub.owner_id = owner_id
      
      if @sub.save
        render json: @sub
      else
        render text: "sub couldn't be created"
      end
    end
  end
end