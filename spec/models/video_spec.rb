require 'rails_helper'

RSpec.describe Video, type: :model do
  it { should belong_to(:user) }

  context 'validates' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:url) }

    it { expect(subject).to respond_to(:total_views) }
    it { expect(subject).to_not respond_to(:total_views=) }
  end

  describe '#increment_views' do
    let(:video) { create(:video) }

    it 'add 1 view on the total_views field' do
      expect(video.total_views).to eq 0

      video.increment_views!
      expect(video.total_views).to eq 1
    end
  end
end
