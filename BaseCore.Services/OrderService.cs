using BaseCore.Entities;
using BaseCore.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaseCore.Services
{
    public class OrderService : IOrderService
    {
        private readonly MySqlDbContext _context;

        public OrderService(MySqlDbContext context)
        {
            _context = context;
        }

        public async Task<Order> CreateOrderAsync(Order order)
        {
            // Get next ID
            order.OrderDate = DateTime.UtcNow;
            order.Status = "Pending";

            

            order.OrderDate = DateTime.UtcNow;
            order.Status = "Pending";

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<List<Order>> GetOrdersByUserIdAsync(Guid userId)
        {
            var orders = await _context.Orders
    .Where(o => o.UserId == userId)
    .OrderByDescending(o => o.OrderDate)
    .Include(o => o.OrderDetails)
        .ThenInclude(d => d.Product)
    .ToListAsync();

            // Load order details and products
            foreach (var order in orders)
            {
                if (order.OrderDetails != null)
                {
                    
                }
            }

            return orders;
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            var order = await _context.Orders
                .Where(o => o.Id == id)
                .Include(o => o.OrderDetails)
                    .ThenInclude(d => d.Product)
         
                .FirstOrDefaultAsync();

            if (order?.OrderDetails != null)
            {
                foreach (var detail in order.OrderDetails)
                {
                    detail.Product = await _context.Products
                        .FirstOrDefaultAsync(p => p.Id == detail.ProductId);
                }
            }

            return order;
        }
    }
}
