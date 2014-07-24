module Api
  class SubsController < ApiController 
    def get_sub_info
      @sub = Sub.find_by_name(params[:name])
      #render json: @sub
      render :sub_info
    end
  end
end