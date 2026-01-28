# @zaaik/react-video-player

![GitHub repo size](https://img.shields.io/github/repo-size/ZaaikJS/react-video-player?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/ZaaikJS/react-video-player?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/ZaaikJS/react-video-player?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/ZaaikJS/react-video-player?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/ZaaikJS/react-video-player?style=for-the-badge)

<img src="https://i.imgur.com/KgVpCxS.png" alt="Exemplo imagem">

> @zaaik/react-video-player is a lightweight, zero-dependency video player for React, built with TypeScript and designed for full control and easy customization.

### Adjustments & Improvements

This project is still under development. Upcoming updates will focus on the following tasks:

- [ ] Loop mode
- [ ] Settings: Quality
- [ ] Settings: Download

## 💻 Prerequisites

Before getting started, make sure you meet the following requirements:

- React `>= 18`

## 🚀 Installing @zaaik/react-video-player

To install **@zaaik/react-video-player**, follow these steps:

Linux, macOS and Windows:

```
npm install @zaaik/react-video-player
```

## ☕ Using @zaaik/react-video-player

To use **@zaaik/react-video-player**, follow these steps:

```ts
import Video from "@zaaik/react-video-player";
import myVideo from "./video.mp4" /* Import your video */

export default function MyApp({
    return (
        <Video
            src={myVideo} /* Or use src={"/video.mp4"} from public */
            width={800}
            height={400}
            autoPlay={true} /* Default 'false' */
            muted={false} /* Default 'true' */
            settings={true} /* Default 'true' */
         />
    )
}

```

### Props reference

| Prop       | Type    | Default | Description                         |
|------------|---------|---------|-------------------------------------|
| `src`      | string  | —       | Video source URL or imported file   |
| `width`    | number  | —       | Player width in pixels              |
| `height`   | number  | —       | Player height in pixels             |
| `autoPlay` | boolean | false   | Automatically starts video playback |
| `muted`    | boolean | true    | Starts the video muted              |
| `settings` | boolean | true    | Shows settings button               |


## 📫 Contributing to @zaaik/react-video-player

To contribute to **@zaaik/react-video-player**, follow these steps:

1. Fork this repository.
2. Create a new branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m "<commit_message>"`.
4. Push your branch to your fork: `git push origin <branch_name>`.
5. Open a Pull Request.

Alternatively, you can check GitHub’s documentation on [how to create a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

For more detailed guidelines, please read the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## 🤝 Contributors

We would like to thank the following people who have contributed to this project:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/ZaaikJS" title="ZaaikJS">
        <img src="https://avatars.githubusercontent.com/u/67669903" width="100px;" alt="Foto do Iuri Silva no GitHub"/><br>
        <sub>
          <b>ZaaikJS (Owner)</b>
        </sub>
      </a>
    </td>
  </tr>
</table>


## 😄 Become a Contributor

Want to be part of this project? Click [HERE](CONTRIBUTING.md) and learn how to contribute.

## 📝 License

This project is licensed. See the [LICENSE](LICENSE.md) file for more details.