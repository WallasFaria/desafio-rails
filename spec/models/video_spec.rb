require 'rails_helper'

RSpec.describe Video, type: :model do
  it { should belong_to(:user) }

  context 'validates' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:url) }
  end
end
