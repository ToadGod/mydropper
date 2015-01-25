<?php

/*
 * Role Model
 * The model name must be the same name of the table but in the singular
 * Else : protected $table = 'name_table'
 */
namespace APP\MODELS;

use \Illuminate\Database\Eloquent\Model as Eloquent;

class Store extends Eloquent {

	protected $table = 'stores';

	public function __construct()
    {
        parent::__construct();

    }

    public function values(){
        return $this->hasMany('Value');
    }

    public function tags(){
        return $this->belongsToMany('Tag','tag_store','store_id','tag_id');
    }

}