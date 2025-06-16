exports.handler = async function(event, context) {
  // التحقق من نوع الطلب
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // الحصول على معرف المنتج من الاستعلام
  const productId = event.queryStringParameters?.id;

  if (!productId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Product ID is required' })
    };
  }

  // هنا يمكنك إضافة منطق للتحقق من المنتج في قاعدة البيانات
  // هذا مثال بسيط
  const productStatus = {
    id: productId,
    name: 'Sample Product',
    inStock: true,
    price: 99.99,
    lastChecked: new Date().toISOString()
  };

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productStatus)
  };
}; 