class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  layout :layout_by_resource

  protected
    def configure_permitted_parameters
      common_parans = [:first_name, :last_name, :email, :password]

      devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(common_parans) }
      devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(common_parans.merge(:current_password)) }
    end

    def layout_by_resource
      devise_controller? ? "auth" : "application"
    end
end
