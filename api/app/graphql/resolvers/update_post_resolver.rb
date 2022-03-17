module Resolvers
  class UpdatePostResolver < Resolvers::BaseResolver
    description 'Find a post by ID'
    type Types::PostType, null: false

    argument :post, Types::Attributes::PostInput, required: true

    def resolve(post:)
      target_post = Post.find(post.id)
      target_post.update(title: post.title)
      target_post
      rescue ActiveRecord::RecordInvalid => error
        { error: error.message }
    end
  end
end