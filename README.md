# release-commit

This is a fork and re-work of [commit-release](https://www.npmjs.com/package/commit-release) (by [Jamie Mason](https://www.npmjs.com/~fold_left))

When run it updates CHANGELOG.md and DEPENDENCIES.md files, bumps version number in `package.json` and (optionally) tags the commit.

## Install

```shell
npm i -g commit-release
```

or

```shell
npm i --D commit-release
```

(depending on your preferences)

## Usage

```shell
$ release-commit --help

  Usage: release-commit [options]

  Options:
  
      -h, --help                output usage information
      -f, --force               overwrite tag if it exists already
      -n, --no-verify           skip git commit hooks
      -o, --override [version]  override recommended version number
      -p, --postfix [name]      a postfix such as "rc1", "canary" or "beta1"
      -t, --tag                 also tag the commit
```
