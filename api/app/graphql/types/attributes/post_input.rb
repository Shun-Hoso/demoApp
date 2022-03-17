class Types::Attributes::PostInput < Types::BaseInputObject
  argument :id, ID, required: true
  argument :title, String, required: true
end