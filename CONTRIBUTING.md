# Contributing to Anglify

We would love for you to contribute to Anglify and help make it even better than it is today!
As a contributor, here are the guidelines we would like you to follow:

- [Code of Conduct](#coc)
- [Question or Problem?](#question)
- [Issues and Bugs](#issue)
- [Feature Requests](#feature)
- [Submission Guidelines](#submit)
- [Coding Rules](#rules)
- [Commit Message Guidelines](#commit)

## <a name="coc"></a> Code of Conduct

Help us keep Anglify open and inclusive.
Please read and follow our [Code of Conduct](https://github.com/valentingavran/anglify/blob/master/code-of-conduct.md).

## <a name="question"></a> Got a Question or Problem?

Do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests.
Instead, we recommend using [Stack Overflow](https://stackoverflow.com/questions/tagged/anglify) to ask support-related questions. When creating a new question on Stack Overflow, add the `anglify` tag.

Stack Overflow is a much better place to ask questions since:

- there are thousands of people willing to help on Stack Overflow
- questions and answers stay available for public viewing so your question/answer might help someone else
- Stack Overflow's voting system assures that the best answers are prominently visible.

To save your time and ours, we will systematically close all issues that are requests for general support and redirect people to Stack Overflow.

## <a name="issue"></a> Found a Bug?

If you find a bug in the source code, you can help us by [submitting an issue](#submit-issue) to our [GitHub Repository](https://github.com/valentingavran/anglify).
You can also [submit a Pull Request](#submit-pr) with a fix.

## <a name="feature"></a> Missing a Feature?

You can _request_ a new feature by [submitting an issue](#submit-issue) to our GitHub Repository.
If you would like to _implement_ a new feature, please consider the size of the change to determine the proper steps to proceed:

- For a **major feature**, first open a topic and outline your proposal so it can be discussed.
  This process allows us to coordinate our efforts better, prevent duplication of work, and help you craft the change to the project.

  **Note**: Adding a new topic to the documentation or significantly re-writing a topic counts as a major feature.

- **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).

## <a name="submit"></a> Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker. An issue for your problem might already exist and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug, we need to reproduce and confirm it.
In order to reproduce bugs, we require that you provide a minimal reproduction.
Having a minimal reproducible scenario gives us a wealth of important information without going back and forth to you with additional questions.

A minimal reproduction allows us to quickly confirm a bug (or point out a coding problem) and ensures that we are fixing the right problem.

Often, developers find coding problems themselves while preparing a minimal reproduction.
We understand that sometimes it might be hard to extract essential bits of code from a larger codebase, but we need to isolate the problem before we can fix it.

Unfortunately, we cannot investigate / fix bugs without a minimal reproduction, so if we don't hear back from you, we are going to close an issue that doesn't have enough info to be reproduced.

You can file new issues by selecting from our [new issue templates](https://github.com/valentingavran/anglify/issues/new/choose) and filling out the issue template.

### <a name="submit-pr"></a> Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub](https://github.com/valentingavran/anglify/pulls) for an open or closed PR that relates to your submission.
   You don't want to duplicate existing efforts.

2. Be sure that an issue describes the problem you're fixing or documents the design for the feature you'd like to add.
   By discussing the design up front, we can ensure that we are ready to accept your work.

3. [Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) the valentingavran/anglify repo.

4. In your forked repository, make your changes in a new git branch:

   ```shell
   git checkout -b my-fix-branch master
   ```

5. Create your patch, **including appropriate test cases**.

6. Follow our [Coding Rules](#rules).

7. Run the full Anglify test suite.

8. Commit your changes using a descriptive commit message that follows our [commit message conventions](#commit).
   Adherence to these conventions is necessary because release notes are automatically generated from these messages.

   ```shell
   git commit --all
   ```

   Note: the optional commit `-a` command-line option will automatically "add" and "rm" edited files.

9. Push your branch to GitHub:

   ```shell
   git push origin my-fix-branch
   ```

10. In GitHub, send a pull request to `develop`.

### Reviewing a Pull Request

The Anglify team reserves the right to reject pull requests from community members who haven't been good community citizens. Such behavior includes not following the [Anglify code of conduct](https://github.com/valentingavran/anglify/code-of-conduct) and applies within or outside of Anglify managed channels.

#### Addressing review feedback

If we ask for changes via code reviews, then:

1. Make the required updates to the code.

2. Re-run the Anglify test suites to ensure tests are still passing.

3. Create a fixup commit and push it to your GitHub repository (this will update your Pull Request):

   ```shell
   git commit --all --fixup HEAD
   git push
   ```

That's it! Thank you for your contribution!

##### Updating the commit message

A reviewer might often suggest changes to a commit message (for example, to add more context for a change or adhere to our [commit message guidelines](<(#commit)>).
To update the commit message of the last commit on your branch:

1. Check out your branch:

   ```shell
   git checkout my-fix-branch
   ```

2. Amend the last commit and modify the commit message:

   ```shell
   git commit --amend
   ```

3. Push to your GitHub repository:

   ```shell
   git push --force-with-lease
   ```

> NOTE:<br />
> If you need to update the commit message of an earlier commit, you can use `git rebase` in interactive mode.
> See the [git docs](https://git-scm.com/docs/git-rebase#_interactive_mode) for more details.

#### After your pull request is merged

You can safely delete your branch after your pull request was merged and pull the changes from the main (upstream) repository::

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```shell
  git push origin --delete my-fix-branch
  ```

- Check out the master branch:

  ```shell
  git checkout master -f
  ```

- Delete the local branch:

  ```shell
  git branch -D my-fix-branch
  ```

- Update your master with the latest upstream version:

  ```shell
  git pull --ff upstream master
  ```

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested** by one or more specs (unit-tests).
- All public API methods **must be documented**.
- We follow [Google's JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html), but wrap all code at **100 characters**.

## <a name="commit"></a> Commit Message Format

We have very precise rules over how our git commit messages can be formatted. These rules lead to **more
readable messages** that are easy to follow when looking through the **project history**. But also use the git commit messages to **generate the Anglify change log**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory. However, you can omit the 'scope' field if the change does not affect a specific module scope.

Any line of the commit message cannot be longer than 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

Example:

```
fix(button): unable to disable button through binding

Fixes a bug in the `button` component where buttons cannot be disabled through a binding. This is
because the `disabled` input did not set the `disabled` class on the host element.

Fixes #1234
```

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of
the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is
the SHA of the commit being reverted.

### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: 'A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (whitespace, formatting, missing semi-colons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Scope

The scope specifies the place of the commit change. For example
`stepper`, `button`, etc.

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** or **Deprecations** and
is also the place to reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.

**Deprecations** should start with the word `DEPRECATED:`. The rest of the commit message will be
used as content for the note.

A detailed explanation can be found on the [Conventional Changelog](https://www.conventionalcommits.org/en/v1.0.0/#summary) website.
