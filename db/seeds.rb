# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

Post.find_or_create_by(title: 'Sample Post', body: 'Sample Body')

Post.find_or_create_by(title: 'All the post', body: 'The post can not fit on the screen')

Post.find_or_create_by(title: 'Last Post', body: 'May the post be with you.')
