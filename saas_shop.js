function saas_shop_create_tariffs(productID) {
    let arrayTariff = [
        {
            "tariff_id": 1,
            "product_id": 1,
            "name": "Начинающий",
            "description": ["Фича1"],
            "maximum_licenses_count": 10,
            "order": 0,
            "tariff_variants": [
                {
                    "tariff_variant_id": 1,
                    "tariff_id": 1,
                    "period": 30,
                    "price": 1000.00,
                    "ops_json": "{\"json\"}"
                },
                {
                    "tariff_variant_id": 1,
                    "tariff_id": 1,
                    "period": 365,
                    "price": 10000.00,
                    "ops_json": "{\"json\"}"
                }
            ]
        },
        {
            "tariff_id": 1,
            "product_id": 1,
            "name": "Средний",
            "description": ["Фича1", "Фича2"],
            "maximum_licenses_count": 20,
            "order": 0,
            "tariff_variants": [
                {
                    "tariff_variant_id": 1,
                    "tariff_id": 1,
                    "period": 30,
                    "price": 2000.00,
                    "ops_json": "{\"json\"}"
                },
                {
                    "tariff_variant_id": 1,
                    "tariff_id": 1,
                    "period": 365,
                    "price": 20000.00,
                    "ops_json": "{\"json\"}"
                }
            ]
        },
        {
            "tariff_id": 1,
            "product_id": 1,
            "name": "Pro",
            "description": ["Фича1", "Фича2", "Фича3"],
            "maximum_licenses_count": 100,
            "order": 0,
            "tariff_variants": [
                {
                    "tariff_variant_id": 1,
                    "tariff_id": 1,
                    "period": 30,
                    "price": 4000.00,
                    "ops_json": "{\"json\"}"
                },
                {
                    "tariff_variant_id": 1,
                    "tariff_id": 1,
                    "period": 365,
                    "price": 40000.00,
                    "ops_json": "{\"json\"}"
                }
            ]
        }
    ];

    init();

    function init() {
        let widgetID = document.getElementById('saasShopWidget');
        let link = document.createElement('link');
        let container = document.createElement('div');

        /* init style */
        link.rel = "stylesheet";
        link.href = "saas_shop_style.css";
        document.getElementsByTagName('head')[0].appendChild(link);

        /* init container */
        container.classList.add('saas-shop-container');
        arrayTariff.forEach((el) => {
            container.innerHTML += `
                <div class="saas-shop-card">
                    <div class="saas-shop-card-name">${el.name}</div>
                    <ul class="saas-shop-card-list">
                      ${el.description.reduce((r, i) => `${r}<li class="saas-shop-list-item">${i}</li>`, "")}
                    </ul>
                    <div class="saas-shop-card-price">
                      ${el.tariff_variants[0].price} р. / лицензия
                    </div>
                    <form class="saas-shop-card-form">
                      <div class="saas-shop-form-data">
                        Подписка:
                        <div class="saas-shop-form-control">
                          ${el.tariff_variants.reduce((r, i) => `
                            <label class="saas-shop-form-label">
                              <input type="radio" name="period" value="${r.price}" checked>
                              ${r.period} д.
                            </label>
                            <label class="saas-shop-form-label">
                              <input type="radio" name="period" value="${i.price}">
                              ${i.period} д.
                            </label>
                          `)}
                        </div>
                      </div>
                      <div class="saas-shop-form-data">
                        <span class="saas-shop-count-name">
                          Кол-во лицензий: 
                        </span>
                        <div class="saas-shop-form-control">
                          <input class="saas-shop-form-input saas-shop-count"
                                 type="number" name="count" min="1" 
                                 max="${el.maximum_licenses_count}" value="1">
                        </div>
                      </div>
                      <div class="saas-shop-form-data">
                        Итого:
                        <span class="saas-shop-form-control">
                            <span class="saas-shop-result-value"></span>
                            руб.
                          </span>
                      </div>
                      <button class="saas-shop-card-button" type="button">
                        Оформить
                      </button>
                    </form>
                  </div>
            `;
        });

        widgetID.appendChild(container);
    }

    let form = document.getElementsByClassName('saas-shop-card-form');
    for (let i = 0; i < form.length; i++)
    {
        calculation();

        form[i].addEventListener('change', function (event) {
            calculation();
        });

        function calculation() {
            let inputRadio = form[i].querySelectorAll('input[name="period"]');
            let inputNumber = form[i].querySelector('input[name="count"]');
            let resultContainer = form[i].querySelector('.saas-shop-result-value');
            let result = 0;

            for (let j = 0; j < inputRadio.length; j++)
            {
                if (inputRadio[j].checked)
                {
                    result += Number(inputRadio[j].value);

                    for (let i = 1; i < inputNumber.value; i++)
                    {
                        result += Number(inputRadio[j].value);
                    }
                }
            }

            resultContainer.innerText = result;
        }
    }
}