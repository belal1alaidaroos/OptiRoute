﻿using System.ComponentModel.DataAnnotations;

namespace OptiRoute360.DTOs.Auth
{
    public class LoginRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, DataType(DataType.Password)]
        public string Password { get; set; }
    }

    

     
}
