# DB設計

## groups_users
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
 - belongs_to :group
 - belongs_to :user

## messages
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: false|
|group_id|integer|null: false|
|user_id|integer|null: false|
<!-- |created_at||| -->
<!-- |updated_at||| -->

### Association
 - belongs_to :group
 - belongs_to :user

## users
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
<!-- |created_at||| -->
<!-- |updated_at||| -->

### Association
 - has_many :messages
 - has_many :groups_users
 - has_many :groups, through: :groups_users

 ## groups
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
<!-- |created_at||| -->
<!-- |updated_at||| -->

### Association
 - has_many :messages
 - has_many :groups_users
 - has_many :users, through: :groups_users