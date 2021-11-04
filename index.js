const PORT = process.env.PORT || 8000;
const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio')

const app = express()

const extensions = []
const premium = []

app.get('/', (req, res) => {

    axios.get('https://extiverse.com/',{
        responseEncoding: 'binary'
    })
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)

            $('li.border-t.border-gray-200', html).each(function () {
                const name = $(this).find('.text-sm.leading-5.font-medium.text-black.truncate').text()
                    .replace(/\n/g, '')
                    .replace(/\t/g, '')
                    .replace(/\s+/g, ' ')
                const desc = $(this).find('span.truncate').text()
                const image = $(this).find('img.h-10.w-10.rounded-md.object-center').attr('src')
                const totalDownload = $(this).find('.hidden.sm\\:block').text()
                    .replace(/\n/g, '')
                    .replace(/\t/g, '')
                    .replace(/\s+/g, ' ')
                const url = $(this).find('a.group.block.hover\\:bg-purple-darkest.focus\\:outline-none.transition.duration-150.ease-in-out').attr('href')

                extensions.push({
                    name,
                    desc,
                    totalDownload,
                    image,
                    url

                })
            })
            res.json(extensions)
        }).catch((err) => console.log(err))
})

app.get('/premium', (req, res) => {

    axios.get('https://extiverse.com/?filter%5Bq%5D=&sort=-created_at&filter%5Bis%5D%5B%5D=premium&filter%5Btype%5D=',{
        responseEncoding: 'binary'
    })
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)

            $('li.border-t.border-gray-200', html).each(function () {
                const name = $(this).find('.text-sm.leading-5.font-medium.text-black.truncate').text()
                    .replace(/\n/g, '')
                    .replace(/\t/g, '')
                    .replace(/\s+/g, ' ')
                const desc = $(this).find('span.truncate').text()
                const image = $(this).find('img.h-10.w-10.rounded-md.object-center').attr('src')
                const totalDownload = $(this).find('.hidden.sm\\:block').text()
                    .replace(/\n/g, '')
                    .replace(/\t/g, '')
                    .replace(/\s+/g, ' ')
                const url = $(this).find('a.group.block.hover\\:bg-purple-darkest.focus\\:outline-none.transition.duration-150.ease-in-out').attr('href')
                const subscribers = $(this).find('.mt-2.flex.items-center.text-sm.leading-5').first().text()
                    .replace(/\n/g, '')
                    .replace(/\t/g, '')
                    .replace(/\s+/g, ' ')

                premium.push({
                    name,
                    desc,
                    totalDownload,
                    image,
                    subscribers,
                    url

                })
            })
            res.json(premium)
        }).catch((err) => console.log(err))
})


app.listen(PORT, () => console.log(`Server avviato ed in ascolto sulla PORTA ${PORT}`))
