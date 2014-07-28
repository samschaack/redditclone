module Api
  class SubsController < ApiController 
    def get_sub_info
      @sub = Sub.find_by_name(params[:name])
      
      if SubMembership.find_by_user_id_and_sub_id(current_user.id, @sub.id)
        @submember = "yes"
      else
        @submember = "no"
      end
      
      render :sub_info
    end
  end
end