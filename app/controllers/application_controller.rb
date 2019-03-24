class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  after_action :set_header
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

    def set_header
      response.set_header('Authenticity-Token', form_authenticity_token)
      if current_user.present?
        response.set_header('Current-User-Id', current_user.id)
        response.set_header('Current-User-Name', current_user.first_name)
      end
    end
end
