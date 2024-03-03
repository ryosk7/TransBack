FactoryBot.define do
  factory :organization do
    name { Facer::Company.name }
  end
end
