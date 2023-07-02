import { Controller, Get, Res } from '@nestjs/common'
import { AppService } from './app.service'
import { Response } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response): void {
    res.send(`
      <html>
        <head>
          <style>
            .container {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #f0f0f0;
            }
            .dialog {
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
              padding: 2rem;
              max-width: 600px;
              background-color: #fff;
              text-align: center;
            }
            .dialog a {
              color: #337ab7;
              text-decoration: none;
              border-bottom: 1px solid;
              padding-bottom: 2px;
            }
          </style>
        </head>
        <body style="margin:0">
          <div class="container">
            <div class="dialog">
              <h1>Welcome to the Sustainability DApp!</h1>
              <p>
                The Sustainability DApp is designed to help individuals and organizations manage and improve their sustainability efforts.
              </p>
              <p>
                Our API offers various functionalities like GraphQL queries and mutations for managing the data related to these sustainability efforts. We also provide a smart contract service and a user-friendly interface built with Next.js, Flutter, and Rust.
              </p>
              <p>
                To start using the API and explore its features, click the link below.
                <a href="https://api.sustainability.iamkarthick.com/graphql">
                  Click here to visit the GraphQL interface.
                </a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `)
  }
}
