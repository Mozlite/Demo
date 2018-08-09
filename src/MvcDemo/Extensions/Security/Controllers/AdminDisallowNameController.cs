﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mozlite.Extensions.DisallowNames;

namespace Demo.Extensions.Security.Controllers
{
    [Authorize]
    public class AdminDisallowNameController : ControllerBase
    {
        private readonly IDisallowNameManager _nameManager;
        public AdminDisallowNameController(IDisallowNameManager nameManager)
        {
            _nameManager = nameManager;
        }

        public IActionResult Index(DisallowNameQuery query)
        {
            return View(_nameManager.Load(query));
        }
        
        public IActionResult Create()
        {
            return View();
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(IFormCollection form)
        {
            if (form.TryGetValue("names", out var names))
                return Json(_nameManager.Save(string.Join(",", names)),"禁用名称");
            return Error("未能获取到禁用名称！");
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            return Json(_nameManager.Delete(id), "禁用名称");
        }

        [HttpPost]
        public IActionResult Deletes(string ids)
        {
            return Json(_nameManager.Delete(ids), "禁用名称");
        }
    }
}