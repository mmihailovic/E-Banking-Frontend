# E-Banking Project (Early Stage)

This is the initial version of the **frontend part** of the **E-Banking** project, intended to work with the **microservices-based** [E-Banking application](https://github.com/mmihailovic/E-Banking). Currently, a two microfrontends are integrated using **Module Federation**, with the frontend built in **React + TypeScript**, state management via **Redux**, and **UI5 Web Components** for UI elements.

## Current Status

- Two microfrontends are integrated and functional.  
- Basic UI is set up using UI5 Web Components.  
- Redux is currently used to manage shared state, but the plan is to **split Redux stores** so that each microfrontend has its **own independent store**, making them fully decoupled.

## Development Roadmap

1. **Code Cleanup**
   - Remove inline CSS.  
   - Standardize code using **Prettier** and **ESLint**.  

3. **Add New Functionalities**
   - Implement components for remaining e-banking features.  

4. **Add Another Microfrontend**
   - Create and integrate a microfrontend for stock trading.

5. **Decouple Redux**
   - Refactor state management so each microfrontend maintains its own Redux store for full independence.
