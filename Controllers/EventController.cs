using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UclaEventApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

/**
 * Author: RajatL
 * Date: September 23, 2018
 * 
 * UclaEventController implements RESTful methods to manage Events.
 * 
 * 
 * 
 */ 
namespace UclaEventApi.Controllers
{
    /**
     * ControllerBase is used in-place of Controller to as we are not utilizing full MVC.
     */ 
    [Route("api/[controller]")]
    [ApiController]
    public class UclaEventController : ControllerBase
    {

        private readonly UclaEventContext _context;

        public UclaEventController(UclaEventContext context)
        {
            _context = context;
        }

        /**
         *  GetAll, returns the list of UclaEvents to the caller.
         */
        [HttpGet]
        public ActionResult<List<UclaEventItem>> GetAll()
        {
            return _context.UclaEventItems.ToList();
        }

        /**
         *  GetById, returns the requested UclaEvent if found using the provided id by the caller.
         */
        [HttpGet("{id}", Name = "GetUclaEvent")]
        public ActionResult<UclaEventItem> GetById(long id)
        {
            var item = _context.UclaEventItems.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        [HttpPost]
        public IActionResult Create(UclaEventItem item)
        {
            System.Console.WriteLine(item.startDate);

            _context.UclaEventItems.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetUclaEvent", new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, UclaEventItem item)
        {
            var UclaEvent = _context.UclaEventItems.Find(id);
            if (UclaEvent == null)
            {
                return NotFound();
            }

            UclaEvent.Id = id;
            UclaEvent.name = item.name;
            UclaEvent.location = item.location;
            UclaEvent.description = item.description;

            _context.UclaEventItems.Update(UclaEvent);
            _context.SaveChanges();
            return Ok(UclaEvent);

            //return CreatedAtRoute("GetUclaEvent", new { id = item.Id }, item);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var UclaEvent = _context.UclaEventItems.Find(id);
            if (UclaEvent == null)
            {
                return NotFound();
            }

            _context.UclaEventItems.Remove(UclaEvent);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
