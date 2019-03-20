module ApplicationHelper
  def show_alert message, type: 'primary'
    render partial: 'shared/alert',
           locals: { message: message, type: type } if message
  end
end
