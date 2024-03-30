class Coupon < ApplicationRecord
  belongs_to :organization

  validates :address, uniqueness: true, presence: true

  before_create do |coupon|
    coupon.default_settings
  end

  def default_settings
    self.code = self.generate_code
  end

  def self.generate_code
    characters = [('0'..'9'), ('A'..'Z')].map(&:to_a).flatten
    (0...6).map { characters.sample }.join
  end
end
